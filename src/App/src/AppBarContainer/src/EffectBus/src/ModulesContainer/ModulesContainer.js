import React, { useEffect } from 'react';
import EffectModule from './src/EffectModule'
import { defaultEffects } from './src/defaultEffects.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
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
      const mapModules = (defaults) =>
        Array.from({ length: defaults.length }, (v, k) => k).map((v, k) => ({
          id: `item-${k}`,
          content: `item ${k}`,
          params: defaults[v]
        }));
      const mappedModules = mapModules(defaultEffects)
      dispatch(allActions.effectBusActions.setEffectBusData('effectModules', mappedModules))
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
