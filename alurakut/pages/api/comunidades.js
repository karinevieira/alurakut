import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {

    if(request.method === 'POST'){

        const TOKEN = '0fe4d28014b0d07e3bef62b5e0cb0e'
        const client = new SiteClient(TOKEN)
    
        const registroCriado = await client.items.create({
            itemType: '972786',
            ...resquest.body
            // title: 'Comunidade Teste',
            // imageUrl: 'https://www.github.com/karinevieira.png'
        })
        
        console.log(registroCriado)

        response.json({
            dados: 'Alguma dado qualquer',
            registroCriado: registroCriado
        })

        return
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET mas no POST tem!'
    })
}