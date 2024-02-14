import { Switch, Route } from "react-router-dom";

import Home from "../account/Home";
import Aaa from "../app/Aaa";
import PostList from "../post/PostList";

function Router() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/aaa" render={() => <Aaa />} />
      <Route path="/post/get/list" render={() => <PostList />} />
    </Switch>
  );
}

export default Router;
