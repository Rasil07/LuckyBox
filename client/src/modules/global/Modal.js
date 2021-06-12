import React from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const { open, toggle, children, actionButtons, title } = props;

  return (
    <Dialog open={open} onClose={toggle} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title ? title : ''}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actionButtons && (
        <DialogActions>
          <Button onClick={toggle} color="primary">
            Cancel
          </Button>
          <Button onClick={toggle} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
