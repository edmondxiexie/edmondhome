import bookshelf from "../orm/bookshelf";
import User from "./user";
import Home from "./home";
export default bookshelf.Model.extend({
  tableName: "wishlist",
  user: function() {
    return this.belongsTo(User, "keeper_id");
  },
  home: function() {
    return this.belongsTo(Home, "home_id");
  }
});
