import { Switch, Route } from "react-router-dom";

import Home from "../app/Home";
import Aaa from "../app/Aaa";
import PostList from "../post/PostList";
import PostDetail from "../post/PostDetail";
import PostWrite from "../post/PostWrite";
import PostUpdate from "../post/PostUpdate";
import MapNaver from "../map/MapNaver";
import MapList from "../map/MapList";
import MapNaverSec from "../map/MapNaverSec";
import MapCreate from "../map/MapCreate";
import ModalTest from "../map/ModalTest";
import MapListAndUpdate from "../map/MapListAndUpdate";
import BackgroundList from "../background/BackgroundList";
import Login from "../app/Login";
import Logout from "../app/Logout";

function Router() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Login />} />
      <Route path="/logout" render={() => <Logout />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/aaa" render={() => <Aaa />} />
      <Route path="/post/get/list" render={() => <PostList />} />
      <Route path="/post/get/:id" render={() => <PostDetail />} />
      <Route path="/post/write" render={() => <PostWrite />} />
      <Route path="/post/update/:id" render={() => <PostUpdate />} />

      <Route path="/map/naver" render={() => <MapNaver />} />
      <Route path="/map/list" render={() => <MapList />} />
      <Route path="/map/sec" render={() => <MapNaverSec />} />
      <Route path="/map/create" render={() => <MapCreate />} />
      <Route path="/modal" render={() => <ModalTest />} />
      <Route path="/map/text/list" render={() => <MapListAndUpdate />} />
      <Route path="/background/list" render={() => <BackgroundList />} />
    </Switch>
  );
}

export default Router;
