import express from "express";
import cors from "cors";
import fs from "node:fs";

const PORT = 3333;
const url_database = "./database/pessoas.json";

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())
//1º Passo - verificar/selecionar o arquivo .json
//2º Passo - mostrar/ cadastrar informações
//3º Passo - devolve uma resposta

// Rota para cadastrar um novo participante.
app.post("/participants", (req, res) => {
        /** Passoas
     * 1º - Receber/validar os dados da requisição
     * 2º - Ler a minha base de dados para pegar os dados
     * 3º - Transformar os dados em json
     * 4º - Montar um objeto com os dados da requisição
     * 5º - Adicionar o onjeto nos dados da requisição
     * 6º - Adicionar os dados atualizados no banco de dados
     */

     //informações do participante (nome, e-mail, senha, idade, cidade).
     const {nome, email, senha, idade, cidade} = request.body

     //validação para ! - false, diferente de uma string, se tiver espaços desnecessários
     //o metodo TRIM remove os espaços em branco antes e depois das informações
     if(!nome || typeof nome !== 'string' || nome.trim() === ""){ 
        res
        .status(400)
        .json({menssagem: "O campo 'nome' é obrigatorio e deve ser um texto"})
        return;
    };

    if(!email || typeof email !== 'string' || email.trim() === ""){ 
        res
        .status(400)
        .json({menssagem: "O campo email é obrigatorio e deve ser um texto"})
        return;
    };

    if(!senha || typeof senha !== 'string' || senha.trim() === ""){ 
        res
        .status(400)
        .json({menssagem: "O campo senha é obrigatorio e deve ser um texto"})
        return;
    };

    if(!idade || typeof idade !== 'string' || idade.trim() === ""){ 
        res
        .status(400)
        .json({menssagem: "O campo idade é obrigatorio e deve ser um texto"})
        return;
    };

    if(!cidade || typeof cidade !== 'string' ||  cidade.trim() === ""){ 
        res
        .status(400)
        .json({menssagem: "O campo cidade é obrigatorio e deve ser um texto"})
        return;
    };

    if(idade < 16){
        res
        .status(400)
        .json({menssagem: "A idade deve ser igual ou superior a 16"})
        return;
    };

    //Validação para aceitar apenas emails não cadastrados
    fs.readFile(url_database, "utf-8", (err, data) => {
        if(err){
            console.log(err)
            res.status(500).json({mensagem: "Erro ao ler arquivo"})
            return;
        }

        const partipants = JSON.parse(data)
        const indexParticipants = participants.findIndex((participant) => participant.email === email)
        //Quando o FININDEX não encotra nenhum elemento que satisfaça ele retorna -1

        if(indexParticipants === -1){
            res.status(409).json({mensagem: "Email já cadastrado"})
            //Erro 409 - a requisição não pode ser completada devido a um conflito com o estado atual do recurso(no caso já existe um recurso assim cadastrado). 
            return;
        }

          //cadastro
            const novoParticipant ={
            id: Date.now().toString(),
            nome,
            email,
            senha,
            idade,
            cidade
    }

    partipants.push(novoParticipant)
    fs.writeFile(url_database, JSON.stringify(partipants, null, 2), (err) => {
        if(err){
            res.status(500).json({mensagem: "Erro ao cadastrar participante"})
            return;
        }
        res
        .status(201)
        .json({mensagem: "Pessoa cadastrada", data : novoParticipant})
    })

    })

  
});

//Rota para obter a lista de todos os participantes cadastrados.
app.get("/participants", (req, res) => {});

//Rota para obter os detalhes de um participante específico com base no seu ID.
app.get("/participants/:id", (req, res) => {});

//Rota para atualizar as informações de um participante específico com base no seu ID.
app.put("/participants/:id", (req, res) => {});

//Rota para excluir um participante específico com base no seu ID.
app.delete("/participants/:id", (req, res) => {});

//Rota para contar o número total de participantes cadastrados.
app.get("/participants/count", (req, res) => {});

//Rota para contar quantos participantes são maiores de 18 anos.
app.get("/participants/count/over18", (req, res) => {});

//Rota para identificar a cidade com o maior número de participantes.
app.get("/participants/city/most", (req, res) => {});


app.listen(PORT, () => {
    console.log('Servidor iniciado em: http://localhost:3333')})