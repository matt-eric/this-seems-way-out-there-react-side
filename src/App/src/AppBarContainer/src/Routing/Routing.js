import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

function Routing() {

  const [routes] = React.useState(
    [
      {
        path: '/',
        exact: true,
        name: 'EffectBus',
        component: React.lazy(() => import('./src/EffectBus'))
      },
    ]
  )

  const loading = () => <div/>

  return (

    <div>

      <Suspense fallback={loading()}>

        <Switch>

          {

            routes.map((route) => {

              return (

                <Route
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  key={`${route.name}_route`}
                  render={props => (
                    <route.component {...props}/>
                  )}
                />

              )

            })

          }

        </Switch>

      </Suspense>

    </div>

  );

}

export default Routing;
