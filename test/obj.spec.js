describe('Kilo Supplemental - Obj Spec', function() {
  var Obj, BaseObject;

  beforeEach(function(done) {
    BaseObject = {
      foo: function() {
        return 'bar';
      },
      baz: 1
    };

    use('Obj', function(_Obj) {
      Obj = _Obj;
      done();
    });
  });

  describe('base object', function() {
    it('should be cloned', function() {
      var newObject = Obj.clone(BaseObject);
      expect(newObject).not.toBe(BaseObject);
      expect(newObject).toEqual(BaseObject);
    });
  });

  describe('destination', function() {
    it('should be merged with base object', function() {
      var destination = {};
      Obj.merge(BaseObject, destination);
      expect(destination).toEqual(BaseObject);
    });
  });

  describe('base object', function() {
    it('should be empty', function() {
      Obj.clear(BaseObject);
      expect(BaseObject).toEqual({});
    });
  });

  describe('base object and sub object', function() {
    it('should be mixed in to new object', function() {
      var SubObject = {
        hello: function() {
          return 'world';
        }
      };
      var newObject = Obj.merge([BaseObject, SubObject]);

      expect(newObject.foo).not.toBe(undefined);
      expect(newObject.baz).not.toBe(undefined);
      expect(newObject.hello).not.toBe(undefined);
    });
  });

  describe('base object and sub object', function() {
    it('should be mixed in to new object with foo wrapped', function() {
      var SubObject = {
        foo: function(foo) {
          return foo.call(this).toUpperCase();
        }
      };
      var newObject = Obj.wrap([BaseObject, SubObject]);

      expect(newObject.foo).not.toBe(undefined);
      expect(newObject.baz).not.toBe(undefined);
      expect(newObject.foo()).toEqual('BAR');
    });
  });
});