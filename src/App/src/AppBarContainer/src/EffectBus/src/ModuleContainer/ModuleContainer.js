import React, { useEffect } from 'react';
import EffectModule from './src/EffectModule'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../redux/actions'

const useStyles = makeStyles(theme => ({
  effectModuleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
}));

export default function ModuleContainer(){

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    effectModules
  } = useSelector(state => state.effectBus);

  const setEffectBusData = (type, data) =>     dispatch(allActions.effectBusActions.setEffectBusData(type, data))

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
      const mapModules = (count) =>
        Array.from({ length: count }, (v, k) => k).map((k) => ({
          id: `item-${k}`,
          content: `item ${k}`,
        }));
      dispatch(allActions.effectBusActions.setEffectBusData('effectModules', mapModules(14)))
    }
  }, [dispatch, effectModules])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            className={classes.effectModuleContainer}
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
        )}
      </Droppable>
    </DragDropContext>
  );
}
