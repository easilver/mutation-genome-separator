import * as fs from 'fs'
import * as path from 'path'

interface FileParts {
  mutations: string[]
  genomes: string[]
}

console.log(process.argv)
const dirname = process.argv[2]
const outputDirName = process.argv[3] || '' //default to local directory running this script

if (!dirname) {
  console.log('NO DIRECTORY GIVEN')
  console.log('please run lik "npm run separate {your path to a directory with .txt files in it}')
  console.log( 'all .txt files are expected to contain keywords "Mutations" and "Genomes"')
  throw Error('no directory name given')
}

const readFiles = async(mutationStream: fs.WriteStream, genomeStream: fs.WriteStream): Promise<void> => {
  await fs.readdir(dirname, async (err, filenames) => {
    if (err) {
      console.log('there was an error reading file names')
      throw err
    }
    const files = filenames.filter((name) => name.match('.*?\.txt'))
    await files.forEach(async (file) => await separate(file, mutationStream, genomeStream))
  })
}

const removeEmptyLines = (lines: string[]): string[] => (
  lines.reduce((acc, curr) => {
    if (!!curr) {
      acc.push(curr)
    }
    return acc
  }, [])
)

const separate = async (filename: string, mutationStream: fs.WriteStream, genomeStream: fs.WriteStream): Promise<void> => {
  await fs.readFile(dirname + '/' + filename, async (err, content) => {
    if (err) {
      console.log('there was an error reading file ', dirname + filename)
      throw err
    }
    // we assume that the keys "Mutations" and "Genomes" will always exist in that order and never be misspelled or given with any other capitalization
    const stringContent = String(content)
    const splitContent = stringContent.split('Mutations:\n')
    const mutationsAndGenomes = splitContent[1].split('Genomes:\n')
    const mutationsRaw = mutationsAndGenomes[0]
    const genomesRaw = mutationsAndGenomes[1]
    const parts: FileParts =  {
      mutations: removeEmptyLines(mutationsRaw.split('\n')),
      genomes: removeEmptyLines(genomesRaw.split('\n'))
    }
    console.log('writing mutations')
    await mutationStream.write(parts.mutations.join('\n') + '\n', (err) => {
      if (err) {
        throw err
      }
      console.log('mutations updated')
    })
    console.log('writing genomes')
    await genomeStream.write(parts.genomes.join('\n') + '\n', (err) => {
      if (err) {
        throw err
      }
      console.log('genomes updated')
    })
  })
}

const mutationStream: fs.WriteStream = fs.createWriteStream(outputDirName + '/Mutations.txt', {flags:'a'});
const genomeStream: fs.WriteStream = fs.createWriteStream(outputDirName + '/Genomes.txt', {flags:'a'});
readFiles(mutationStream, genomeStream)
