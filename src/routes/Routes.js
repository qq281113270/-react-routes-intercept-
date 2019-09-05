import React, { Suspense, Component, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const componentPage = [
    {
        component: lazy(() => import('../pages/Home/Home')),
        path: '/'
    },
    {
        component: lazy(() => import('../pages/Order/Order')),
        path: '/order'
    },
    {
        component: lazy(() => import('../pages/About/About')),
        path: '/about'
    },

]

const loadingPage = componentPage.map(item => {
    return {
        ...item,
        component: lazy(() => import('../pages/Loading/Loading')),
    }
})

class Routes extends Component {
    constructor (props) {
        super(props);
        this.state = {
            authSuccess: false,
        }
    }

    componentDidMount () {
        setTimeout(() => {
            // 远程请求数据
            this.setState({
                authSuccess: true,
            })
        }, 5000);
    }

    render () {
        const { authSuccess } = this.state;
        // 使用store
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {
                            authSuccess ?
                                componentPage.map(item =>
                                      <Route exact path={item.path} component={item.component} />
                                ):
                                loadingPage.map(item =>
                                      <Route exact path={item.path} component={item.component} />
                                )
                        }
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}
export default Routes;
