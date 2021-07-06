import cn from 'classnames';

const wrapper = cn('container-fluid');
const container = cn(
  'row',
  'justify-content-center',
  'pt-5',
);
const columnsStyles = cn('col-sm-4');
const formPadding = cn('p-3');
const formStyle = cn('form-group');
const formLabelStyles = cn('form-label');
const signupBtnStyles = cn(
  'w-100',
  'mb-3',
  'btn',
  'btn-outline-primary',
);

export {
  wrapper, container, columnsStyles, formPadding, formStyle, formLabelStyles, signupBtnStyles,
};
