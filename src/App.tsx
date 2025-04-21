import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './widgets/header';
import { userService, useUserAcions } from './entities/user';
import { LoaderSpinner, SyncBasket, SyncFavourites } from './shared';
import { useAppSelector } from './app/store/store';
import { Bottom } from './widgets/bottom';
import { basketService } from './entities/basket';
import { categoryService, useCategoriesActions } from './entities/category';
import { NavMainDesctop } from './features/nav';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {setIsAuth, setName, setPhone, setRoles, setBasket, setFavourites} = useUserAcions()
  const {setNames, setIsLoading: setIsLoadingCategories, setError} = useCategoriesActions()

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

  const getCategoriesNames = async () => {
    try{
      setIsLoadingCategories(true)
      const data = await categoryService.getNames()
      setNames(data)
    }
    catch(e){
      if(e instanceof Error){
        setError(e.message)
      }
      console.log(e)
    }
    finally{
      setIsLoadingCategories(false)
    }
  }

  useEffect(() => {
    getCategoriesNames()
    auth()
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
            <header className="App-header">
              <Header />
            </header>

            <NavMainDesctop />
    
            {/* <section className='mainWrap'> */}
              <Outlet />
            {/* </section> */}

            <footer>  
                <Bottom />
            </footer>
          </>

        }
      </HelmetProvider>
    </section>
  );
}

export default App;