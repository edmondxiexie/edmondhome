import bookshelf from "../orm/bookshelf";
import User from "./user";
import Home from "./home";
export default bookshelf.Model.extend({
  tableName: "trips",
  user: function() {
    return this.belongsTo(User, "guest_id");
  },
  home: function() {
    return this.belongsTo(Home, "home_id");
  }
});
