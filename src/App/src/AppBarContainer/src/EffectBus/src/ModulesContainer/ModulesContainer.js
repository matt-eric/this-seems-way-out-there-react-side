import React, { useEffect } from 'react';
import EffectModule from './src/EffectModule'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import allActions from '../../../../../../../redux/actions'

const useStyles = makeStyles(theme => ({
  effectModulesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  optionsContainer: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column'
  },
  optionsButton: {
    color: '#69f0ae',
    backgroundColor: '#000',
    border: '1px solid #69f0ae',
    marginTop: '5px',
    marginBottom: '10px',
    marginRight: '10px',
    '&:hover': {
        backgroundColor: '#04080a',
        color: '#69f0ae'
    }
  }
}));

export default function ModulesContainer(){

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    effectModules,
  } = useSelector(state => state.effectBus);

  const setEffectBusData = (type, data) => dispatch(allActions.effectBusActions.setEffectBusData(type, data))

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      effectModules,
      result.source.index,
      result.destination.index,
    );
    setEffectBusData('effectModules', items)
  }

  useEffect(() => {

    if(!effectModules){

      const client = new ApolloClient({
         uri: process.env.REACT_APP_NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_SERVER_URL : process.env.REACT_APP_DEVELOPMENT_SERVER_URL ,
         cache: new InMemoryCache()
       });

       client
        .query({
          query: gql`
            query {
              effects {
                id,
                type,
                displayName,
                bypass,
                settings {
                  type,
                  displayName,
                  value,
                  max,
                  min,
                  step
                 }
               }
             }
           `
        })
        .then(result => {

        const effectModules = result.data.effects.map(effect => (
          {
            ...effect,
            settings: [...effect.settings]
          }
        ));

        const values = ['max', 'min', 'step', 'value']

        for(let i=0; i<effectModules.length; i++){
          let currentEffectModule = [...effectModules][i]
          let effectSettings = [...currentEffectModule.settings]
          for(let s=0; s<effectSettings.length; s++){
            let setting = {...effectModules[i].settings[s]}
            for(let val=0; val<values.length; val++){
              setting[values[val]] = setting[values[val]]/1000
            }
            effectSettings[s] = setting
          }
          effectModules[i]['settings'] = effectSettings
        }

        const mapModules = (defaults) =>
          Array.from({ length: defaults.length }, (v, k) => k).map((v, k) => ({
            id: `item-${k}`,
            content: `item ${k}`,
            params: defaults[v]
          }));

        const mappedModules = mapModules(result.data.effects)

        dispatch(allActions.effectBusActions.setEffectBusData('effectModules', mappedModules))

      });
    }
  }, [dispatch, effectModules])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(droppableProvided, droppableSnapshot) => (
          <div>
            <div
              ref={droppableProvided.innerRef}
              className={classes.effectModulesContainer}
            >
              {effectModules && effectModules.map((effect, index) => (
                <Draggable key={effect.id} draggableId={effect.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <EffectModule
                      params={effect.params}
                      index={index}
                      innerRef={draggableProvided.innerRef}
                      draggableProps={draggableProvided.draggableProps}
                      dragHandleProps={draggableProvided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
