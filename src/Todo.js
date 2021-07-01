import { Box, Button, ButtonGroup, Card, List, ListItem, ListItemText, makeStyles, Modal, TextField } from '@material-ui/core'
import "./Todo.css";
import React, { useState } from 'react'
import db from "./firebase"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Input } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { motion } from "framer-motion";


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    list: {
        display: 'flex',
        alignItems: 'center',
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

}));

function Todo(props) {
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }
    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
            description: description
        }, { merge: true })
        setOpen(false);
    }
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
            <Modal open={open} onClose={e => setOpen(false)}>

                <div className={classes.paper} style={modalStyle}>
                    <h1>Edit your Todo</h1>

                    <TextField id="outlined-secondary"
                        variant="outlined"
                        color="secondary"
                        fullWidth={true}
                        value={input}
                        onClick={e => setInput(props.todo.todo)}
                        onChange={e => setInput(e.target.value)}
                        placeholder={props.todo.todo} />
                    <br />
                    <br />
                    <br />
                    <TextField
                        multiline
                        id="outlined-secondary"
                        variant="outlined"
                        color="secondary"
                        fullWidth={true}
                        onClick={e => setDescription(props.todo.description)}
                        placeholder={props.todo.description}
                        onChange={event => setDescription(event.target.value)}
                        value={description}
                        rows={5}
                    />
                    <ButtonGroup className={classes.root} variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick={updateTodo} disabled={!(input && description)}>Update Todo</Button>
                        <Button onClick={e => setInput(props.todo.todo)}>Reset Default</Button>
                    </ButtonGroup>



                </div>

            </Modal>
            <Box display="flex">
                <Card className={classes.card} component={motion.div}
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 }
                    }}
                >
                    <ListItem>
                        <ListItemText primary={props.todo.todo} secondary={new Date(props.todo.timestamp).toString()} />
                    </ListItem>
                    <ListItem>

                        <ListItemText secondary={props.todo.description} />
                    </ListItem>

                    <ButtonGroup className={classes.root} variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick={e => setOpen(true)}>Edit</Button>
                        <IconButton>
                            <DeleteForeverIcon
                                onClick={event => db.collection("todos").doc(props.todo.id).delete()} />
                        </IconButton>
                    </ButtonGroup>
                </Card>
            </Box>
        </>
    )
}

export default Todo
