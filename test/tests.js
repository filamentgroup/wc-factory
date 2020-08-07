(function(window) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
    */

  

	test();
    
    asyncTest( 'function factory works!', function(){
        expect(26);

        ok( window.factory, "factory class is defined" );
        ok( new factory().connectedCallback, "factory connected callback is defined")
        ok( new factory().disconnectedCallback, "factory disconnected callback is defined")

        function newElem( does ){
            var comp = document.createElement('a-component');
            comp.setAttribute("does", does );
            return comp;
        }

        window.one = class one {
            create(){
                ok(this.elem, "this.elem is defined in create")
                ok(this,"create ran for one");
            }
            destroy(){
                ok(this.elem, "this.elem is defined in destroy runs")
                ok(this, "destroy ran for one");
            }
        };

        window.two = class two {
            create(){
                ok(this.elem, "this.elem is defined in create")
                ok(this,"create ran for two");
            }
            destroy(){
                ok(this.elem, "this.elem is defined after create runs")
                ok(this, "destroy ran for two");
            }
        };

        var newc = newElem("one two");
        
        ok( newc , "element is created" );

        newc.addEventListener("create.one", function(e){
            equal(e.type, "create.one", "create event for one fires")
            equal(e.target, newc, "new element is the target of the event");
            ok(e.target.classList.contains("one-defined"), "one-defined class is present");
            ok(e.target.one, "one object exists on element");
            ok(e.target.one.destroy, "one object has the destroy method");

        });

        newc.addEventListener("create.two", function(e){
            equal(e.type, "create.two", "create event for two fires")
            equal(e.target, newc, "new element is the target of the event");
            ok(e.target.classList.contains("two-defined"), "two-defined class is present");
            ok(e.target.two, "two object exists on element");
            ok(e.target.two.destroy, "two object has the destroy method");
            e.target.remove();
        });

        window.addEventListener("destroy.one", function(e){
            equal(e.type, "destroy.one", "destroy event for one fires")
            equal(e.target, document, "document is the target of the event");
        });

        window.addEventListener("destroy.two", function(e){
            equal(e.type, "destroy.two", "destroy event for two fires")
            equal(e.target, document, "document is the target of the event");
            start();
        });

        document.querySelector("#qunit-fixture").append(newc);
	});



}(window));
