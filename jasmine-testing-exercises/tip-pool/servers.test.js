describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = "Kenneth";
  });

  it("should add new server to allServers on submitServerInfo()", function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Kenneth");
  });

  it("should not add a new server on submitServerInfo() with an empty input", function () {
    serverNameInput.value = "";
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it("should add new tr with server name and server earnings to #serverTable on updateServerTable()", function () {
    submitServerInfo();
    updateServerTable();

    let serverTdList = document.querySelectorAll("#serverTable tbody tr td");

    expect(serverTdList.length).toEqual(3);
    expect(serverTdList[0].innerText).toEqual("Kenneth");
    expect(serverTdList[1].innerText).toEqual("$0.00");
    expect(serverTdList[2].innerText).toEqual("X");
  });

  afterEach(function () {
    // teardown logic
    serverId = 0;
    serverTbody.innerHTML = "";
    allServers = {};
  });
});
