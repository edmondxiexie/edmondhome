import bookshelf from "../orm/bookshelf";
import Trip from "./trip";
import User from "./user";

export default bookshelf.Model.extend({
  tableName: "homes",
  trip: function() {
    return this.hasMany(Trip);
  },
  host: function() {
    return this.belongsTo(User, "host_id");
  }
});
