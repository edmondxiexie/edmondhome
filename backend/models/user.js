import bookshelf from "../orm/bookshelf";
import Trip from "./trip";
import Home from "./home";
export default bookshelf.Model.extend({
  tableName: "users",
  trip: function() {
    return this.hasMany(Trip);
  },
  home: function() {
    return this.hasMany(Home);
  }
});
