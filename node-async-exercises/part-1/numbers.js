//Make request to Numbers API to get fact about number

class NumberFacts {
  constructor(favNum, favNums) {
    this.favNum = favNum;
    this.favNums = favNums;
    this.baseUrl = "http://numbersapi.com";

    this.getSingleFact();
    this.getManyFacts();
    this.getFourFacts();
  }

  async getSingleFact() {
    try {
      let res = await axios.get(`${this.baseUrl}/${this.favNum}?json`);
      console.log(res.data);
    } catch (e) {
      console.log("OH NO AN ERROR!", e);
    }
  }

  async getManyFacts() {
    try {
      let res = await axios.get(`${this.baseUrl}/${this.favNums}?json`);
      const manyNumsData = res.data;
      for (let key in manyNumsData) {
        $("#many-numbers").append($(`<li>${manyNumsData[key]}</li>`));
      }
    } catch (e) {
      console.log("OH NO AN ERROR!", e);
    }
  }

  async getFourFacts() {
    try {
      let fourFacts = await Promise.all(
        Array.from({ length: 4 }, () =>
          axios.get(`${this.baseUrl}/${this.favNum}?json`)
        )
      );
      fourFacts.forEach((el) => {
        $("#four-facts").append($(`<li>${el.data.text}</li>`));
      });
    } catch (e) {
      console.log("OH NO AN ERROR!", e);
    }
  }
}
