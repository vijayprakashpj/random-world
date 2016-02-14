var expect = require('chai').expect,
    random = require('../index');

/**
 * mock tests
 *
 * @return {[type]}   [description]
 */
describe('Mocking server tests:', function() {

    describe('fromMock() simple object', function () {

        var obj = {
            "type": "object",
            "struct": {
                "firstName": "$firstname{\"gender\":\"male\"}",
                "lastName": "$lastname",
                "age": "$integer is a nice age to be",
                "block": "$block",
                "someArray": [{nativeType: 1}],
                "array": "$array",
                "ext": "$pickone{\"items\": \"+11|+44|+99\"}"
            },
            "collections": {
                "companies": {
                    "pagination": {
                        "limits": 10
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 444} is a company name $firstname.",
                        "companyAge": "$integer",
                        "website": "http://www.$word{\"delimiter\":\"-\", \"limit\": 2}.com",
                        "phoneExtension": "$pickone{\"items\": \"+11|+44|+99\"}"
                    }
                },
                "statuses": {
                    "pagination": {
                        "limits": 2
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 444}"
                    }
                },
                "singleObject": {
                    "type": "object",
                    "struct": {
                        "foo": "$integer",
                        "name": "$word"
                    }
                }
            }
        };

        console.log(obj);

        // console.log('json transformed output', random.fromMock(random, obj));

        it('should return an object', function () {
            expect(random.fromObject(random, obj))
                .to.be.a('object')
                .to.have.all.keys('firstName', 'lastName', 'age', 'companies', 'someArray', 'block', 'statuses', 'array', 'singleObject', 'ext');
        });
    });

    describe('fromMock() paginated collection', function () {

        var obj = {
            "type": "collection",
            "pagination": {
                "limit": 12
            },
            "struct": {
                "firstName": "$firstname{\"gender\":\"female\"}",
                "lastName": "$lastname{\"startsWith\": \"Bu\"}",
                "introduction": "My last name is $$lastname, but my maiden name is $lastname.",
                "age": "$integer",
                "array": "$array",
                "device": "$pickone{\"items\": \"Android|iOS|Windows\"}"
            },
            "collections": {
                "companies": {
                    "pagination": {
                        "limits": 10
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 136} is a company name $firstname.",
                        "companyAge": "$integer"
                    }
                },
                "statuses": {
                    "pagination": {
                        "limits": 2
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 345}"
                    }
                }
            }
        };

        // console.log('json transformed output', random.fromMock(random, obj));

        it('should return a collection that contains 12 objects', function () {
            expect(random.fromMock(random, obj))
                .to.be.a('array')
                .to.have.length(12);
        });
    });
});
