import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

function Routing() {

  const [routes] = React.useState(
    [
      {
        path: '/',
        exact: true,
        name: 'Playground',
        component: React.lazy(() => import('./src/views/Playground'))
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
