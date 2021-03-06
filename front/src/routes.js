import React from "react";
import {Route} from 'react-router-dom';
import {ConnectedSwitch} from './reactRouterConnected';
import Loadable from 'react-loadable';

import NotFoundPage from "./pages/DefaultPages/NotFoundPage";
import HomePage from "./pages/DefaultPages/HomePage";
import Page from "./components/LayoutComponents/Page";
import ChatPage from "./pages/ChatsPage";
import FriendsPage from "./pages/FriendRequestsPage";
import GamesPage from "./pages/GamesPage/GamesPage";


const loadable = loader =>
  Loadable({
    loader,
    delay:false,
    loading:() => null,
  })


const loadableRoutes = {

  '/login':{
    component:loadable(() => import('pages/DefaultPages/LoginPage')),
  },
  '/consolesPage':{
    component:loadable(() => import('pages/ConsolePage')),
  },

  '/auth/register': {
    component: loadable(() => import('pages/DefaultPages/RegisterPage')),
  },


  '/chatsPage': {
    component: loadable(() => import('pages/ChatsPage')),
  },

  '/friendsPage': {
    component: loadable(() => import('pages/FriendRequestsPage')),
  },
  '/gamesPage':{
    component:loadable(() => import('pages/GamesPage/GamesPage')),
  },
  '/messagesPage': {
    component: loadable(() => import('pages/MessagesPage')),
  },

}


class Routes extends React.Component{

  timeoutId = null;

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path=>loadableRoutes[path].component.preload()),5000,
    )
  }

  componentWillUnmount() {
    if (this.timeoutId){
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export {loadableRoutes}
export default Routes
