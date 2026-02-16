import { supabase } from './supabase';

export interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, unknown>;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert({
        event_type: event.event_type,
        event_data: event.event_data || {}
      });

    if (error) {
      console.error('Analytics tracking error:', error);
    }
  } catch (err) {
    console.error('Failed to track event:', err);
  }
};

export const getAnalytics = async () => {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching analytics:', error);
    return [];
  }

  return data || [];
};

export const getEventCounts = async () => {
  const { data, error } = await supabase
    .from('analytics')
    .select('event_type');

  if (error) {
    console.error('Error fetching event counts:', error);
    return {};
  }

  const counts: Record<string, number> = {};
  data?.forEach(item => {
    counts[item.event_type] = (counts[item.event_type] || 0) + 1;
  });

  return counts;
};
