import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../redux/actions'

const useStyles = makeStyles(theme => ({
  effectModuleContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
}));

export default function EffectModuleContainer(){

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

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    border: '5px solid yellow',
    height: 30,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'red',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver, overflow) => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    border: '5px solid pink',
    width: 250,
    maxHeight: '50vh',
    overflow,
  });

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
      dispatch(allActions.effectBusActions.setEffectBusData('effectModules', mapModules(4)))
    }
  }, [dispatch, effectModules])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            style={getListStyle(
              droppableSnapshot.isDraggingOver,
              // this.props.overflow,
            )}
            onScroll={(e) =>
              // eslint-disable-next-line no-console
              console.log('current scrollTop', e.currentTarget.scrollTop)
            }
            className={classes.effectModuleContainer}
          >
            {effectModules && effectModules.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={getItemStyle(
                      draggableSnapshot.isDragging,
                      draggableProvided.draggableProps.style,
                    )}
                  >
                    {item.content}
                  </div>
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
