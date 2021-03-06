import m from 'mithril';
import { getTimeString, getPointsString } from 'other';
import { translate } from 'services';

export default class ListItem {
	getCommentString(comments) {
		const numComments = Number(comments);
		if(numComments > 1) return comments + ' ' + translate('COMMENTS');
		if(numComments <= 0) return translate('DISCUSS');
		if(numComments == 1) return comments + ' ' + translate('COMMENT');
	}

	getSourceString(href) {
		// extracts hostname
		const matches = href.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
		let source = matches && matches[1]; 
		let split = source.split('.');
		if(split.length <= 2) return source;

		// removes subdomain prefix
		split.shift();
		return split.join('.');
	}

	upVote = () => {
		console.log('upvote');

	}

	downVote = () => {
		console.log('downvote');

	}

	view({ attrs }) {
		const { post } = attrs;
		const { id, title, date, comments, points, href, author } = post;

		const time = getTimeString(date) + ' ' + translate('POST_AGO');
		const commentString = this.getCommentString(comments);
		const pointsString = getPointsString(points);
		const source = this.getSourceString(href);
		
		return m('li', { class: 'item post' }, [
			m('.container-points', [
				m('.points', pointsString),
				m('.buttons', [
					m('div', {
						class: 'down button',
						onclick: this.upVote
					}, '⬆'),
					m('div', {
						class: 'down button',
						onclick: this.downVote
					}, '⬇')
				])
			]),
			m('.container-content', [
				m('.title', [
					m('a', {
						class: 'link',
						href,
						target: '_blank'
					},
					title),
					m('div', {
						class: 'source',
					},
					`(${source})`),
				]),
				m('.subtitle', [
					m('a', {
						class: 'author',
						href: `/user/${author}`,
						oncreate: m.route.link
					}, `${translate('POST_POSTED_BY')} ${author}`),
					m('.divider', ' | '),
					m('div', {
						class: 'time'
					}, time),
					m('.divider', ' | '),
					m('a', {
						class: 'comments',
						href: `/post/${id}`,
						oncreate: m.route.link
					}, commentString)
				])
			]),
		]);
	}
}
