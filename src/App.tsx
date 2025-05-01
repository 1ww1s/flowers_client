import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './widgets/header';
import { userService, useUserAcions } from './entities/user';
import { LoaderSpinner, SyncBasket, SyncFavourites } from './shared';
import { Bottom } from './widgets/bottom';
import { basketService } from './entities/basket';
import { categoryService, useCategoriesActions } from './entities/category';
import { NavMainDesctop } from './features/nav';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { VK_AUTH_ROUTE } from './app/router/routes';

function App() {

  const {setIsAuth, setName, setPhone, setRoles, setBasket, setFavourites} = useUserAcions()
  const {setNames, setIsLoading: setIsLoadingCategories, setLoaded} = useCategoriesActions()

  const {pathname, search} = useLocation()
  
  const isVkAuth = pathname === VK_AUTH_ROUTE.path
  const [isLoading, setIsLoading] = useState<boolean>(!isVkAuth)

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [pathname, search])

  const getCategoriesNames = async () => {
    try{
      setIsLoadingCategories(true)
      const data = await categoryService.getNames()
      setNames(data)
      setLoaded(true)
    }
    catch(e){
      console.log(e)
    }
    finally{
      setIsLoadingCategories(false)
    }
  }

  const getBasket = async () => {
    const userBasket = await basketService.basketGet()
    await SyncBasket(true, userBasket, setBasket)
  }

  const auth = async () => {
    try{
      setIsLoading(true)
      const user = await userService.check()
      setIsAuth(true)
      setName(user.name)
      setPhone(user.phone)
      setRoles(user.roles)
      await getBasket()
    }
    catch(e){
      SyncBasket(false, [], setBasket)
      console.log(e)
    }
    finally{
      SyncFavourites(setFavourites)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(!isVkAuth){
      auth()
    }
    getCategoriesNames()
  }, [])

  return (
    <section className="App">
      <HelmetProvider>
        <Helmet>
          <title>flowers</title>
          <meta name="description" content="Магазин flowers предлагает широкий ассортимент товаров. Воспользовавшись нашим предложением, клиенты оценят не только удобство сервиса, но и качество предлагаемых цветочных композиций. Вы можете приобрести любимые цветы круглосуточно! Вы можете сделать заказ онлайн и мы доставим его к вам или заберите его в магазине самостоятельно." />
        </Helmet>
        {
          isLoading
            ?
          <section className={"loaderMain"}><LoaderSpinner /></section>
            :
          <>
            {
              !isVkAuth
                &&
              <>
                <header className="App-header">
                  <Header />
                </header>
                <NavMainDesctop />
              </>
            }
            <Outlet />
            {
              !isVkAuth
                &&
              <footer>  
                  <Bottom />
              </footer>
            }
          </>
        }
      </HelmetProvider>
    </section>
  );
}

export default App;