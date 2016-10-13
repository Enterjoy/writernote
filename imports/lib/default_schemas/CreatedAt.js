export const CreatedAt = {
  type: Date,
  optional: true,
  autoValue() {
    if (this.value) {
      return this.value;
    } else if (this.isInsert) {
      return new Date();
    } else if (this.isUpdate || this.isUpsert) {
      return {$setOnInsert: new Date()};
    } else {
      this.unset();
    }
  },
};
