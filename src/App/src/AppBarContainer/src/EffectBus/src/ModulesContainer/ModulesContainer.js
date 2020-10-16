import React, { useEffect } from 'react';
import EffectModule from './src/EffectModule'
import { defaultEffects } from './src/defaultEffects.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../redux/actions'

const useStyles = makeStyles(theme => ({
  effectModulesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  addButton: {
    height: '300px',
    color: '#69f0ae',
    backgroundColor: '#04080a',
    border: '2px solid #69f0ae',
    margin: '12.5px',
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

  const addModule = () => {
    // const mapModules = (count) =>
    //   Array.from({ length: count }, (v, k) => k).map((k) => ({
    //     id: `item-${k}`,
    //     content: `item ${k}`,
    //   }));
    // dispatch(allActions.effectBusActions.setEffectBusData('effectModules', mapModules.length+1))
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
          <div className={classes.effectModulesContainer}>
            <div>
              <Button className={classes.addButton} variant='contained' onClick={() => addModule()}>
                <AddIcon fontSize='large'/>
              </Button>
            </div>
            <div
              ref={droppableProvided.innerRef}
              className={classes.effectModulesContainer}
            >
              {effectModules && effectModules.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <EffectModule
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
