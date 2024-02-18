import { Switch, Route } from "react-router-dom";

import Home from "../account/Home";
import Aaa from "../app/Aaa";
import PostList from "../post/PostList";
import PostWrite from "../post/PostWrite";
import PostDetail from "../post/PostDetail";
import Write from "../post/Write";

function Router() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/aaa" render={() => <Aaa />} />
      <Route path="/post/get/list" render={() => <PostList />} />
      <Route path="/post/write" render={() => <PostWrite />} />
      <Route path="/post/:id" render={() => <PostDetail />} />
      <Route path="/write" render={() => <Write />} />
    </Switch>
  );
}

export default Router;
