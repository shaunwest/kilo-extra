describe('Kilo Data HashArray Spec', function() {
  var HashArray = kilo('HashArray'), hashArray;

  beforeEach(function(){
    hashArray = new HashArray();
    hashArray.set('a', 1);
    hashArray.set('b', 2);
    hashArray.set('c', 3);
    hashArray.set('d', 4);
  });

  describe('keys', function() {
    it('should match', function() {
      expect(hashArray.getKeys()).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('values', function() {
    it('should match', function() {
      expect(hashArray.getValues()).toEqual([1, 2, 3, 4]);
    })
  })
});