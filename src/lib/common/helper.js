import moment from 'moment/moment';

const calculateTimeElapsed = (timestamp) => {
  // console.log(timestamp)
    const now = new Date();
    const postedTime = new Date(timestamp);
    const timeDifference = now - postedTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  };



const calDateRange = (startDate, numberOfDays, isHour) => {
  const start = moment(startDate);
  if (numberOfDays) {
    const end = start.clone().add(numberOfDays - 1, 'days');

    const formattedStartDate = start.format('MMM D');
    const formattedEndDate = end.format('MMM D');

    return `${formattedStartDate} to ${formattedEndDate}`;
  } else {
    if (isHour) return start.format('h:mma').toUpperCase()
    return start.format('ddd MM/DD');
  }
}

const execComment = (text, obj, isGetCat) => {

  if (!text) return null
  const matches = text.match(/@(\d+)_(\w+(?:-\w+)*)/g);

  if (!matches) {
    return text;
  }

  const arr = matches.map(match => {
   
    const [id, name] = match.match(/@(\d+)_(\w+(?:-\w+)*)/);

    return {id: parseInt(id), name, str: match};
  });

  let advisorCmt = text
  let count = 0
  let cat
  for (const arrEl of arr) {
    if (obj[`meta_${arrEl.name.replace(/-/g, '_')}s`] && obj[`meta_${arrEl.name.replace(/-/g, '_')}s`].length) {
      const value = obj[`meta_${arrEl.name.replace(/-/g, '_')}s`].find(meta => meta.uid === arrEl.id)
      if (value) advisorCmt = advisorCmt.replace(arrEl.str, value['g_name_external'])
      if (isGetCat && count === 0) cat = value['your_edit_category'] ? value['your_edit_category'] : 'Eat and Drink'
    }
    count++
  }
  if (!isGetCat) return advisorCmt
  else return {content: advisorCmt, cat}
}
const execCommentDailyItinerary = (text, obj) => {

  if (!text) return null
  const matches = text.match(/@(\d+)_(\w+(?:-\w+)*)/g);

  if (!matches) {
    return text;
  }

  const arr = matches.map(match => {
   
    const [text,id, name] = match.match(/@(\d+)_(\w+(?:-\w+)*)/);

    return {id: parseInt(id), name, str: match};
  });

  let advisorCmt = text
  let count = 0
  for (const arrEl of arr) {
    if (obj[`meta_${arrEl.name.replace(/-/g, '_')}`] ) {
      const value = [obj[`meta_${arrEl.name.replace(/-/g, '_')}`]].find(meta => meta.uid === arrEl.id)
      if (value) advisorCmt = advisorCmt.replace(arrEl.str, value['name'])
    }
    count++
  }
return advisorCmt

}
const hiddenEmailAddress = email => {
  const str = email.split('@')[0]
  const domain = email.split('@')[1]
  const _str = []
  str.split('').forEach((el, i) => {
    if (i < str.length - 3) _str.push('*')
    else _str.push(el)
  })
  return `${_str.join('')}@${domain}`
}

export {
  calculateTimeElapsed,
  calDateRange,
  execComment,
  hiddenEmailAddress,
  execCommentDailyItinerary
}