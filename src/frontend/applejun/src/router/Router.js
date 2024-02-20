import { Switch, Route } from "react-router-dom";

import Home from "../account/Home";
import Aaa from "../app/Aaa";
import PostList from "../post/PostList";
import PostDetail from "../post/PostDetail";
import PostWrite from "../post/PostWrite";
import PostUpdate from "../post/PostUpdate";
import MapNaver from "../map/MapNaver";

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
    </Switch>
  );
}

export default Router;
