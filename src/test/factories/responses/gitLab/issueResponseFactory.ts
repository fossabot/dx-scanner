/* eslint-disable @typescript-eslint/camelcase */
import _ from 'lodash';
import { Issue } from '../../../../services/gitlab/gitlabClient/resources/Issues';

export const gitLabIssueResponseFactory = (params: Partial<Issue>): Issue => {
  return _.merge(
    {
      id: 31202035,
      iid: 207825,
      project_id: 278964,
      title: 'Marginalia: Filter lines in stacktrace',
      description:
        "Follow-up for https://gitlab.com/gitlab-org/database-team/team-tasks/issues/30#note_292428210:\n\nMarginalia's line references often end up pointing to database load balancer code or similar:\n\n```\n/*application:web,correlation_id:HnFTVEMUC\nJ3,line:/ee/lib/gitlab/database/load_balancing/connection_proxy.rb:63:in `block in read_using_load_balancer'*/\n```\n\n> :line supports a configuration by setting a regexp in Marginalia::Comment.lines_to_ignore to exclude parts of the stacktrace from inclusion in the line comment.\n\nMarginalia supports to filter particular lines, so perhaps we can tune it more to our needs. The goal is to show the line in the codebase where the query originated from.\n\nAs [noted](https://gitlab.com/gitlab-org/database-team/team-tasks/issues/30#note_292679100) by @sribalakumar, there might be performance implications coming out of this.",
      state: 'opened',
      created_at: '2020-02-24T12:49:46.119Z',
      updated_at: '2020-03-02T11:14:16.842Z',
      closed_at: null,
      closed_by: null,
      labels: ['Accepting merge requests', 'backend', 'backstage', 'database', 'devops::enablement', 'group::database'],
      milestone: {
        id: 490705,
        iid: 14,
        group_id: 9970,
        title: 'Backlog',
        description: 'Issues that we want to do but are not planned right now. Open for contribution from the community.',
        state: 'active',
        created_at: '2018-03-22T13:09:23.767Z',
        updated_at: '2018-10-30T14:56:54.069Z',
        due_date: null,
        start_date: null,
        web_url: 'https://gitlab.com/groups/gitlab-org/-/milestones/14',
      },
      assignees: [],
      author: {
        id: 1562869,
        name: 'Andreas Brandl',
        username: 'abrandl',
        state: 'active',
        avatar_url: 'https://secure.gravatar.com/avatar/1695cc5a71bceb20e318d46114abef48?s=80&d=identicon',
        web_url: 'https://gitlab.com/abrandl',
      },
      assignee: null,
      user_notes_count: 2,
      merge_requests_count: 0,
      upvotes: 0,
      downvotes: 0,
      due_date: null,
      confidential: false,
      discussion_locked: null,
      web_url: 'https://gitlab.com/gitlab-org/gitlab/issues/207825',
      time_stats: {
        time_estimate: 0,
        total_time_spent: 0,
        human_time_estimate: null,
        human_total_time_spent: null,
      },
      task_completion_status: {
        count: 0,
        completed_count: 0,
      },
      weight: null,
      has_tasks: false,
      _links: {
        self: 'https://gitlab.com/api/v4/projects/278964/issues/207825',
        notes: 'https://gitlab.com/api/v4/projects/278964/issues/207825/notes',
        award_emoji: 'https://gitlab.com/api/v4/projects/278964/issues/207825/award_emoji',
        project: 'https://gitlab.com/api/v4/projects/278964',
      },
      references: {
        short: '#207825',
        relative: '#207825',
        full: 'gitlab-org/gitlab#207825',
      },
      subscribed: false,
      moved_to_id: null,
      epic_iid: null,
      epic: null,
    },
    params,
  );
};
