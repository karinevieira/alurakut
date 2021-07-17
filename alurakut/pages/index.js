import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades){
  return(
    <Box as="aside">
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>@{propriedades.githubUser}</a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})</h2>
      <ul>

      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'karinevieira'
  const [communities, setCommunities] = React.useState([{
    id: '15654846546510654',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const favoriteUsers = ['LucasMagalhaes33', 'maykbrito', 'filipedeschamps', 'gustavoguanabara', 'lucasmontano', 'bonieky']
  
  const [Followers, setFollowers] = React.useState([])

  React.useEffect(function() {
    fetch('https://api.github.com/users/karinevieira/followers')
      .then(function (respostaDoServidor){
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta){
        setFollowers(respostaCompleta)
      })

      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'b7f164273f6271bc9c743a253593d9',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": `query {
          allCommunities {
          id 
          title
          imageUrl
        }
      }` })
    })
      .then((response) => response.json()) 
      .then((respostaCompleta) => {
      const communitiesFromDato = respostaCompleta.data.allCommunities;
      setCommunities(communitiesFromDato)
    })
  }, [])


  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault()
              const formData = new FormData (e.target)
              const community = {
                // id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image')
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const dados = await response.json()
                console.log(dados.registroCriado)
                const community = dados.registroCriado
                const updatedCommunities = [...communities, community]
                setCommunities(updatedCommunities)
              })

            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text" />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usamos de capa" name="image" aria-label="Coloque uma URL para usamos de capa" />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Followers" items={Followers} />
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length}) </h2>

          <ul>
            {communities.map((currentItem) => {
              return (
              <li key={currentItem.id}>
                <a href={`/communities/${currentItem.id}`} key={currentItem.title}>
                <img src={currentItem.imageUrl} />
                <span>{currentItem.title}</span>
                </a>
              </li>
              )
            })}
          </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({favoriteUsers.length}) </h2>

            <ul>
              {favoriteUsers.map((currentItem) => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
