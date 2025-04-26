import express from "express";
import cors from "cors";
import fs from "node:fs";

const PORT = 3333;
const url_database = "./database/participants.json";

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
 const {nome, email, senha, idade, cidade} = req.body

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
    const indexParticipants = partipants.findIndex((participant) => participant.email === email)
    //Quando o FININDEX não encotra nenhum elemento que satisfaça ele retorna -1

    if(indexParticipants !== -1){
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

//Rota para contar o número total de participantes cadastrados.
app.get("/participants/count/over18", async (req, res) => {
    fs.readFile(url_database, 'utf8', (err, data) => {
        if (err) { // validação de erro
            console.error("Erro ao ler o arquivo JSON:", err);
            return res.status(500).json({ message: "Erro ao contar participantes" });
        }
        try { //se não cair no err tente
            const participants = JSON.parse(data); // transformar os dados de participants em um obj json
            const Over18 = participants.filter(particiant => parseInt(participants.idade) > 18)
            res.status(200).json({ totalParticipants: Over18.length }); // use a propriedade length para contar o total de participantes acima de 18
        } catch (parseError) {  // validação de erro caso parse data tenha algum problema
            console.error("Erro ao processar o arquivo JSON:", parseError);
            return res.status(500).json({ message: "Erro ao processar dados dos participantes" });
        }
    });
});

//Rota para contar o número total de participantes cadastrados.
app.get("/participants/count", async (req, res) => {
    fs.readFile(url_database, 'utf8', (err, data) => {
        if (err) { // validação de erro
            console.error("Erro ao ler o arquivo JSON:", err);
            return res.status(500).json({ message: "Erro ao contar participantes" });
        }
        try { //se não cair no err tente
            const participants = JSON.parse(data); // transformar os dados de participants em um obj json
            res.status(200).json({ totalParticipants: participants.length }); // use a propriedade length para contar o total de participantes
        } catch (parseError) {  // validação de erro caso parse data tenha algum problema
            console.error("Erro ao processar o arquivo JSON:", parseError);
            return res.status(500).json({ message: "Erro ao processar dados dos participantes" });
        }
    });
});

//Rota para obter a lista de todos os participantes cadastrados.
app.get("/participants", (req, res) => {
    fs.readFile(url_database, 'utf-8', (err,data) => { //le o arquivo
        if(err){ //validação caso seja dectado um erro ao carregar os dados
            console.log(err)
            res.status(500).json({mensagem: "Erro ao carregar dados"})
            return
        }
        const participantes = JSON.parse(data) // transforma a variável data em um objeto json
        res.status(200).json({participantes}
        )
    })
});

//Rota para obter os detalhes de um participante específico com base no seu ID.
app.get("/participants/:id", (req, res) => {
    const {id} = req.params

    fs.readFile(url_database, 'utf-8', (err, data) => {
        //valida o erro em caso de não conseguir ler o arquivo erro server side
        if(err){
            console.log('erro:', err)
            res.status(500).json({mensagem: "Erro ao ler arquivo"})
            return
        }

        //lógica para ecnontrar o participant4e
        const participants = JSON.parse(data) // transforma a variável aonde estçao todos os participantes em obj json
        console.log(participants) // printa no con sole para ver o resultado(se ta tudo certo)
        const encontrarPartcipant = participants.find((participant) => participant.id === id) // usa o find para garantir que o participante encontrado é o mesmo
        //valida caso o processo encontre um participante não cadastrado no banco de dados
        if(!encontrarPartcipant){ 
            res.status(404).json({mensagem: "Participante não encontrado"})
            return
        }
        //se todos os passos funcionarem corretamente e for encontrado esse participante é a linha de baixo que mostra isso
        res.status(200).json({encontrarPartcipant})
    })
});

//Rota para atualizar as informações de um participante específico com base no seu ID.
app.put("/participants/:id", (req, res) => {
    /**
     * Passos para conseguir atualizar um cadastro 
     * 1- verificar se a pessoa existe
     * 2- Atualizar as informações
     * 3- Atualizar o arquivo .json que faz o papel de banco de dados com as novas informações
     */

    const {id} = req.params
    const {nome,email,senha,idade,cidade} = req.body

    //validação de resposta
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

        const participants = JSON.parse(data)
        const indexParticipants = participants.findIndex((participant) => participant.email === email)
        //Quando o FININDEX não encotra nenhum elemento que satisfaça ele retorna -1

        if(indexParticipants === -1){
            res.status(409).json({mensagem: "Email já cadastrado"})
            //Erro 409 - a requisição não pode ser completada devido a um conflito com o estado atual do recurso(no caso já existe um recurso assim cadastrado). 
            return;
        }

    //codigo para buscar a pessoa que vai ser atualizada
    
        fs.readFile(url_database, "utf-8", (err, data) => {
            // caso o fs tenha algum erro ao ler o arquivo 
            if(err){
                console.log(err)
                res.status(500).json({mensagem: "Erro ao ler arquivo"})
                return
            }
            
            //transforma a base de dados em um obj json para que possa utilizar o metodo findindex
            const pessoas = JSON.parse(data)
            const indexPessoa = pessoas.findIndex((pessoa) => pessoa.id === id)
            //Quando o FINDINDEX não encontra nenhum elementi que satisfaça ele retorna -1
    
            if(indexPessoa === -1){
                res.status(404).json({mensagem: "Pessoa não encontrada"})
                return
            }
    
            pessoas[indexPessoa] = {...pessoas[indexPessoa],nome, cargo} //Essa linha de código é responsável por atualizar as informações no banco de dados
    
            fs.writeFile(url_database, JSON.stringify(pessoas, null, 2), (err) => {
                if(err){
                    res.status(500).json({mensagem: "Erro ao atualizar arquivo"})
                    return
                }
                res.status(200).json({mensagem: "Pessoa atualizada", pessoa:pessoas[indexPessoa]})
            })
        })
        
    });
}); 

//Rota para excluir um participante específico com base no seu ID.
app.delete("/participants/:id", (req, res) => {
    const {id} = req.params

    fs.readFile(url_database, "utf-8", (err, data) => {
        if(err){
            res.status(500).json({mensagem: "Erro ao ler arquivo"})
            return
        }

        const participants = JSON.parse(data)
        const indexParticipants = participants.findIndex((participant) => participant.id === id)

        if(indexParticipants === -1){
            res.status(404).json({mensagem: "Participante não encontrado"})
            return
        }

        const participantRemovido = participants.splice(indexParticipants, 1)[0]
        console.log(participantRemovido)

        fs.writeFile(url_database, JSON.stringify(participants, null, 2), (err) => {
            if(err){
                console.log(err)
                res.status(500).json({mensagem: "Erro ao salvar arquivo"})
                return
            }
            res.status(200).json({mensagem: "Participante removido", participant: participantRemovido})
        })
    })
});

//Rota para identificar a cidade com o maior número de participantes.
app.get("/participants/city/most", (req, res) => {
    
    fs.readFile(url_database, "utf-8", (err, data)=> {
        const participants = JSON.parse(data) // transfroma os dados 
        if (err) {// validação de erro
            console.err("Erro ao ler ou processar o arquivo JSON:", err);
            return res.status(500).json({ message: "Erro ao identificar a cidade com mais participantes" });
        }
        
        const cityCounts = {}; // objeto que vai armazenar o nome e quantidade de participantes daquela cidade
        
        participants.forEach(participant => { // utiliza o foreach pra percorrer toda database de participantes
            const city = participant.cidade; // armazena na const a cidade daquela participante atual do foreach
            cityCounts[city] = (cityCounts[city] || 0) + 1; // adiciona um contador na cidade dos participantes que ja apareceram
        });
        
        let mostFrequentCity = null;
        let maxCount = 0;
        
        for (const city in cityCounts) { // analisa a cidade dentro de citycounts
            if (cityCounts[city] > maxCount) { // com o maior contador
                maxCount = cityCounts[city]; // se a cidade daquele momento do for tiver mais participantes que maxcount, max count começa a ter o mesmo  valor do CONTADOR daquela cidade
                mostFrequentCity = city; // most frequency vai armazenar o nome dessa cidade
            }
        }
        
        return res.status(200).json({ mostFrequentCity: mostFrequentCity, participantCount: maxCount });
    })
    
});


app.listen(PORT, () => {
    console.log('Servidor iniciado em: http://localhost:3333')})