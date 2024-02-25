import React, { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';

const useFeedGallery = () => {
  const queryClient = useQueryClient();

  const setFeedData = (items) => {
    queryClient.setQueriesData({
      queryKey: ["feedGallery"]
    }, () => (items))

    queryClient.fetchQuery({
      queryKey: ["feedGallery"],
      queryFn: () => (items),
      staleTime: 0,
      gcTime: Infinity
    })

  }
  const getFeedData = () => queryClient.getQueriesData({
    queryKey: ["feedGallery"]
  })?.[0]?.[1]
 

  return {
    setFeedData, 
    getFeedData,
  }
}

export default useFeedGallery