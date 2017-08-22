#### Simple redux demo 

1. 使用纯React实现组件通信

&emsp;&emsp;如果应用内的数据通信非常简单，可以直接使用React完成组件间通信，利用prop定义组件的对外接口，
用state代表内部的状态，但是一旦组件间的通信变得复杂，这种方式就有了很大的缺点：使用state存储数据会造成数据的冗余和重复，
比如本例中，每个Counter组件有自己的状态记录当前计数，而父组件Summary中也有一个状态来存储所有的Counter计数之和，数据在这里发生了重复，因此带来的一个问题就是如何保持数据一致性问题；此外使用prop传递数据，若有多层的组件结构，顶层的祖父组件想要传递一个数据给最底层的子组件，用prop的方式，只能通过父组件中转，也许中间的父组件根本用不上这个数据，但是仍然需要支持这个prop，扮演着搬运工的角色，这明显违背了低耦合的原则。

2. 使用Flux实现

&emsp;&emsp;Flux的架构下，应用的状态存储在各个Store中，React组件只是扮演View的作用，被动根据Store的状态来渲染，在这个例子中，Counter组件根据CounterStore来获取状态，Summary组件根据SummaryStore来获取状态，用户的操作如点击按钮等引发的是一个“动作”的派发，此例中Counter组件的点击事件会派发一个action,然后这个action会发送给所有的Store对象，所有Store在Dispatcher上注册的回调函数都会被执行，通过waitFor函数控制执行的顺序，然后更新Store的状态，之后进行广播，各组件可通过监听函数来获取新的Store状态，根据shouldComponentUpdate决定是否更新组件。Flux架构带来的最大好处便是“单向数据流”的管理方式，通过这种限制禁绝了数据流混乱的可能，同时,Flux也有一些不足，如Store之间的依赖关系，难以进行服务器端渲染，Store混杂了逻辑和状态。

3. 使用Redux实现

&emsp;&emsp;Flux的基本原则是“单向数据流”，Redux在此基础上强调三个基本原则：唯一数据源、保持状态只读、数据改变只能通过纯函数reducer完成。整体流程可简述为，首先，通过store.getState()获取初始化状态，然后，用户发出action,`store.dispatch(action)`,然后,store自动调用reducer，并且传入两个参数，当前state和收到的action,reducer会返回新的state,state一旦有变化，store就会调用监听函数，根据shouldComponentUpdate决定是否更新组件。