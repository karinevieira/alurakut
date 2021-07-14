
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades){
  return(
    <Box>
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

export default function Home() {

  const githubUser = 'karinevieira'
  const favoriteUsers = ['LucasMagalhaes33', 'maykbrito', 'filipedeschamps', 'gustavoguanabara', 'lucasmontano', 'bonieky']
  const communities = []

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
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length}) </h2>

          <ul>
            {communities.map((currentItem) => {
              return (
              <li>
                <a href={`/users/${currentItem}`} key={currentItem}>
                <img src={`https://github.com/${currentItem}.png`} />
                <span>{currentItem}</span>
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
                  <li>
                    <a href={`/users/${currentItem}`} key={currentItem}>
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
