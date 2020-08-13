# WC Factory

A web component that behaves as a widget factory.

- [tests](https://filamentgroup.github.io/wc-factory/test/)
- [demo](https://filamentgroup.github.io/wc-factory/demo/)

## Documentation

This small scripts acts as a widget factory to apply one or more JS behaviors to an element wrapper.

### Wrapper Element

This script looks for an element called `a-component` which can contain any markup you'd like. 

```html
<a-component>
  <p>Content goes here</p>
</a-component>
```

The element itself does nothing, but by adding a `does` attribute, you can reference one or more functions that should execute when the element appears in the DOM.

```html
<a-component does="one two">
  <p>Content goes here</p>
</a-component>
```

As an example, the component above will run global functions `one` and `two`.

### Setting up functions

Regular JavaScript functions will work with this factory regardless of their format. For example, if the `one` function looks like this, it will run as expected:

```js
function one(){
  alert( "one!" );
}
```

That said, the factory will call some helpful methods if they are defined. For example, when the element is added to the DOM, the factory will call the function's `create` method if available, and within that method and any others you define, the element will be defined as `this.elem`. For example:

```js
function one(){
  this.create = function(){
      alert( this.elem + " was created!" );
  }
}
```

Additionally, the `destroy` method will be called when the element is removed from the DOM, which is handy if you have any cleanup to do, such as removing other elements that were related to the removed element (say, a modal dialog's screen).

```js
function one(){
  this.create = function(){
    alert( this.elem + " was created!" );
  }
  this.destroy = function(){
      alert( this.elem + " was destroyed!" );
  }
}
```

If you prefer, you can write these functions in class syntax instead:

```js
class One(){
  create(){
    alert( this.elem + " was created!" );
  }
  destroy(){
    alert( this.elem + " was destroyed!" );
  }
}
```

..which is a little more concise and does the same thing. However, if you use classes, just be sure to expose them in a way that this script can recognize:

```
class One(){...}
window.one = One;
```

### Events and DOM additions

When a create or destroy method is run, the factory will emit an event for each respectively.

- Create event: the `create` event fires when the `create` method runs. The full event name includes the function name, so for the `one` function, the full event you'll bind to is `create.one`. Its `event.target` is the `a-component` element.
- Destroy event: the `destroy` event fires when the `destroy` method runs. The full event name includes the function name, so for the `one` function, the full event you'll bind to is `destroy.one`. Its `event.target` is the `document`, because the element is no longer in the page.

Additionally, when a function runs, a "defined" class of that function's name will be added to the element:

```html
<a-component does="one two" class="one-defined two-defined">
  <p>Content goes here</p>
</a-component>
```

This class lets you style the element knowing that each function has been applied.

### Accessing the function instance

For each element, you can find a reference its functions under their named properties. For example, if you wanted to find the first `a-component` and call its `one` function's `hello` method, you could do this:

```js
document.querySelector("a-component").one.hello();
```


## Accessible components that use this factory:

- [Modal](https://filamentgroup.github.com/wc-modal/)
- Collapsible
- Carousel
