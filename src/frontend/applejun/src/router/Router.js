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

function Router() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/aaa" render={() => <Aaa />} />
      <Route path="/post/get/list" render={() => <PostList />} />
      <Route path="/post/get/:id" render={() => <PostDetail />} />
      <Route path="/post/write" render={() => <PostWrite />} />
      <Route path="/post/update/:id" render={() => <PostUpdate />} />

      <Route path="/map/naver" render={() => <MapNaver />} />
      <Route path="/map/list" render={() => <MapList />} />
      <Route path="/map/sec" render={() => <MapNaverSec />} />
    </Switch>
  );
}

export default Router;
