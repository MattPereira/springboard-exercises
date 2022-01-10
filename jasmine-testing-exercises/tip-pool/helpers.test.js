describe("Helpers test with setup and teardown", function () {
  beforeEach(function () {
    // initialization logic
    billAmtInput.value = 1000;
    tipAmtInput.value = 222;
    submitPaymentInfo();
  });

  it("should sum total tip amount of all payments on sumPaymentTotal()", function () {
    expect(sumPaymentTotal("tipAmt")).toEqual(222);

    billAmtInput.value = 500;
    tipAmtInput.value = 111;

    submitPaymentInfo();

    expect(sumPaymentTotal("tipAmt")).toEqual(333);
  });

  it("should sum total bill amount of all payments on sumPaymentTotal()", function () {
    expect(sumPaymentTotal("billAmt")).toEqual(1000);

    billAmtInput.value = 500;
    tipAmtInput.value = 111;

    submitPaymentInfo();

    expect(sumPaymentTotal("billAmt")).toEqual(1500);
  });

  it("should sum total tip percent on sumPaymentTotal()", function () {
    expect(sumPaymentTotal("tipPercent")).toEqual(22);

    billAmtInput.value = 500;
    tipAmtInput.value = 111;

    submitPaymentInfo();

    expect(sumPaymentTotal("tipPercent")).toEqual(44);
  });

  it("should sum tip percent of a single tip on calculateTipPercent()", function () {
    expect(calculateTipPercent(400, 44)).toEqual(11);
    expect(calculateTipPercent(333, 66)).toEqual(20);
  });

  it("should generate new td from value and append tr on appendTd(tr, value)", function () {
    let newTr = document.createElement("tr");

    appendTd(newTr, "test");
    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual("test");
  });

  it("should add a delete td and append to tr on appendDeleteBtn(tr)", function () {
    let newTr = document.createElement("tr");

    appendDeleteBtn(newTr);
    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual("X");
  });

  afterEach(function () {
    // teardown logic
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
    paymentId = 0;
    allPayments = {};
  });
});
