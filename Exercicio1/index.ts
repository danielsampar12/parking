import * as fs from 'fs'
import * as readlineSync from 'readline-sync'

const configFilePath = 'config.json'

interface Config {
  server_name: string
  server_ip: string
  server_password: string
}

function readConfigFile(): void {
  
  if (fs.existsSync(configFilePath)) {
    const data = fs.readFileSync(configFilePath, 'utf-8')
    if (data) {
      console.log(JSON.parse(data))
    } else {
      console.log("O arquivo não contém informações.")
    }
  } else {
    fs.writeFileSync(configFilePath, JSON.stringify({}))
    console.log("O arquivo não contém informações.")
  }
}

function writeConfigFile(): void {
  const serverName = readlineSync.question('Informe o nome do servidor:')
  const serverIP = readlineSync.question('Informe o IP do servidor:')
  const serverPassword = readlineSync.question('Informe a senha do servidor:')


  const config: Config = {
    server_name: serverName,
    server_ip: serverIP,
    server_password: serverPassword
  }

  fs.writeFileSync(configFilePath, JSON.stringify(config))
  console.log("Informações salvas com sucesso!");
}

function main() {
  const options = ['Read configuration - (Escrever no arquivo)', 'Write configuration - (Ler arquivo)']
  
  // retorna o index da opção no array, e não o número pressionado para escolher a opção
  const index = readlineSync.keyInSelect(options, 'O que deseja fazer?', { cancel: false })

  if (index !== 0 && index !== 1) {
    return
  }

  index === 0 ? readConfigFile() : writeConfigFile()
}

main()