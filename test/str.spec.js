describe('Str Spec', function() {
  var Str;

  beforeEach(function(done) {
    use('Str', function(_Str) {
      Str = _Str;
      done();
    }); 
  });

  describe('sprintf', function() {
    it('should replace placeholders', function() {
      expect(Str.sprintf('Hello %%, my name is %%', 'Foo', 'Bar')).toBe('Hello Foo, my name is Bar');
    });
  });
});