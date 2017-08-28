#### Simple redux demo 

1. 使用纯React实现组件通信

&emsp;&emsp;如果应用内的数据通信非常简单，可以直接使用React完成组件间通信，利用prop定义组件的对外接口，
用state代表内部的状态，但是一旦组件间的通信变得复杂，这种方式就有了很大的缺点：使用state存储数据会造成数据的冗余和重复，
比如本例中，每个Counter组件有自己的状态记录当前计数，而父组件Summary中也有一个状态来存储所有的Counter计数之和，数据在这里发生了重复，因此带来的一个问题就是如何保持数据一致性问题；此外使用prop传递数据，若有多层的组件结构，顶层的祖父组件想要传递一个数据给最底层的子组件，用prop的方式，只能通过父组件中转，也许中间的父组件根本用不上这个数据，但是仍然需要支持这个prop，扮演着搬运工的角色，这明显违背了低耦合的原则。

2. 使用Flux实现

&emsp;&emsp;Flux的架构下，应用的状态存储在各个Store中，React组件只是扮演View的作用，被动根据Store的状态来渲染，在这个例子中，Counter组件根据CounterStore来获取状态，Summary组件根据SummaryStore来获取状态，用户的操作如点击按钮等引发的是一个“动作”的派发，此例中Counter组件的点击事件会派发一个action,然后这个action会发送给所有的Store对象，所有Store在Dispatcher上注册的回调函数都会被执行，通过waitFor函数控制执行的顺序，然后更新Store的状态，之后进行广播，各组件可通过监听函数来获取新的Store状态，根据shouldComponentUpdate决定是否更新组件。Flux架构带来的最大好处便是“单向数据流”的管理方式，通过这种限制禁绝了数据流混乱的可能，同时,Flux也有一些不足，如Store之间的依赖关系，难以进行服务器端渲染，Store混杂了逻辑和状态。

3. 使用Redux实现

&emsp;&emsp;Flux的基本原则是“单向数据流”，Redux在此基础上强调三个基本原则：唯一数据源、保持状态只读、数据改变只能通过纯函数reducer完成。整体流程可简述为，首先，通过store.getState()获取初始化状态，然后，用户发出action,`store.dispatch(action)`,然后,store自动调用reducer，并且传入两个参数，当前state和收到的action,reducer会返回新的state,state一旦有变化，store就会调用监听函数，根据shouldComponentUpdate决定是否更新组件。

4. 将Redux组件拆分为容器组件和无状态组件

&emsp;&emsp;在Redux框架下，一个React组件基本上就是要完成两个功能：和redux store打交道，读取store的状态，用于初始化组件的状态，同时还要监听store的状态改变，当store的状态改变时，需要更新组件状态，从而驱动组件重新渲染，当需要更新store状态时，就需要派发action对象；另一个功能便是根据当前的props和state，渲染用户界面，因此，我们可以考虑将之拆分为两个组件，一个用于和redux store打交道的容器组件，一个只专心负责渲染界面的无状态组件（UI组件）。实际上，这种拆分组件为容器组件和无状态组件是设计React组件的一种模式，和Redux没有直接关系。

5. ReduxContext

&emsp;&emsp;在之前的例子中，直接在各个组件中导入store,虽然rudex应用全局就一个store，但这样的导入依然有问题，不利于组件复用，在实际工作中，一个应用的规模会很大，不会所有的组件都放在一个代码库中，有时还要通过npm方式引入第三方的组件，当开发一个独立的组件时，自己都不知道这个组件将存在于哪个应用中，当然不可能预先知道定义唯一redux store的文件位置了，所以，通过使用react的Context功能可以解决这个问题，所谓Context,就是”上下文环境“，让一个树状组件上的所有组件都能访问一个共同的对象，为了完成这个任务，需要上级组件和下级组件配合。首先，上级组件要宣称自己支持Context，并且提供一个函数来返回代表Context的对象，然后，这个上级组件之下的所有子孙组件，只有宣称自己需要这个Context，就可以通过this.context访问到这个共同的环境对象。

6. React-Redux

&emsp;&emsp;通过使用React-Redux这个库可以将4、5所做的工作简化，它帮我们完成了这些工作。
* Provider不需要我们再自己定义，直接从React-Redux引入即可
* 不需要再手动定义容器组件，通过React-Redux的connect函数自动生成，这个函数接收两个参数mapStateToProps和mapDispatchToProps。
mapStateToProps函数是输入逻辑，由外部的数据（store的state对象)确定UI组件的参数。接收两个参数(state,ownProps)，它会订阅store，当state或发生改变时，该函数自动执行(ownProps发生改变时也会自动执行),重新计算UI组件的参数，从而引发UI组件的重新渲染。。
mapDispatchToProps函数则是输出逻辑，根据用户不同的动作派发出不同的action。接收两个参数(dispatch,ownProps);