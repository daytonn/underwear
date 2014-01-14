describe("Template", function() {
  var subject;
  var template_element;

  beforeEach(function() {
    subject = new Template("Hello <%= thing %>");
    var t = document.createElement("script");
    t.type = "text/template";
    t.id = "test-template";
    document.body.appendChild(t);
    test_template = document.getElementById("test-template");
    test_template.innerHTML = "Hello <%= thing %>";
    template_element = new Template("#test-template");
  });

  it("should have a template source", function() {
    expect(subject.src).toEqual("Hello <%= thing %>");
  });

  it("should take an element id as a template src", function() {
    expect(template_element.src).toEqual("Hello <%= thing %>");
  });

  it("should have a render method", function() {
    expect(subject.render({ thing: "World!" })).toEqual("Hello World!");
  });
});
