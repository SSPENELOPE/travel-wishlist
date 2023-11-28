class Destination {
    constructor(name, location, photo, description) {
      this.name = name;
      this.location = location;
      this.photo = photo || "https://www.fluentu.com/blog/travel/wp-content/uploads/sites/37/2018/07/travel-around-the-world-cost-e1535307163370.jpg";
      this.description = description;
    }
  
    // Static method to create a Destination instance from form values
    static fromFormValues(formValues) {
      return new Destination(
        formValues.name,
        formValues.location,
        formValues.photo,
        formValues.description
      );
    }
}

export default Destination;