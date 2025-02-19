import { enqueueSnackbar } from 'notistack';
import { InputData, SelectType } from './model/type';

export const convertToValueLabel = (
  data: (string | { idx: string; name: string })[] = [],
): { value: string; label: string }[] => {
  return data.map((item) =>
    typeof item === 'string'
      ? { value: item, label: item }
      : { value: item.idx, label: item.name },
  );
};

export const handleUnknownError = (errorResponse?: {
  [key: string]: string | string[];
}) => {
  if (!errorResponse) {
    enqueueSnackbar('An unexpected error occurred. Please try again.', {
      variant: 'error',
    });
    return;
  }

  if (typeof errorResponse === 'object') {
    Object.entries(errorResponse).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((message: string) =>
          enqueueSnackbar(` ${key}: ${message}`, { variant: 'error' }),
        );
      } else if (typeof value === 'string') {
        enqueueSnackbar(` ${key}: ${value}`, { variant: 'error' });
      }
    });
  } else if (typeof errorResponse === 'string') {
    enqueueSnackbar(errorResponse, { variant: 'error' });
  } else {
    enqueueSnackbar('An unexpected error occurred. Please try again.', {
      variant: 'error',
    });
  }
};

export const getMyInfo = async (accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/auth/users/me/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      const { detail } = await response.json();
      enqueueSnackbar(detail, { variant: 'error' });
      return null;
    }
  } catch (error) {
    enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
    return null;
  }
};

export const formatCurrency = (
  value: number | string,
  symbol: string = 'रु',
): string => {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numberValue)) return '';

  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${symbol} ${formatter.format(numberValue)}`;
};

export const handleError = (errorResponse: {
  [key: string]: string | string[];
}) => {
  if (typeof errorResponse === 'object') {
    Object.entries(errorResponse).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value.join(', ') : value;
      enqueueSnackbar(message, { variant: 'error' });
    });
  } else {
    enqueueSnackbar(errorResponse || 'An unexpected error occurred.', {
      variant: 'error',
    });
  }
};
