export const ModifiedAt = {
  type: Date,
  autoValue: function() {
    if (this.isUpdate || this.isUpsert) {
      return new Date();
    }
  },
  optional: true
};
