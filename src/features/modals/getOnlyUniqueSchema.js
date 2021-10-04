import * as yup from 'yup';

const getOnlyUniqeChannelName = (uniqueCollection) => yup.object().shape({
  name: yup.string()
    .min(3, 'modals.min')
    .max(20, 'modals.max')
    .notOneOf(uniqueCollection, 'modals.uniq'),
});

export default getOnlyUniqeChannelName;
