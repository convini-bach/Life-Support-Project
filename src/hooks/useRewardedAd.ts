import { useEffect, useState, useCallback, useRef } from 'react';

declare global {
  interface Window {
    googletag: any;
  }
}

/**
 * 動画リワード広告を制御するためのカスタムフック
 * @param adUnitId 広告ユニットID
 */
export const useRewardedAd = (adUnitId: string) => {
  const [isReady, setIsReady] = useState(false);
  const rewardedSlotRef = useRef<any>(null);

  useEffect(() => {
    // 開発環境でもスクリプトが読み込まれていない場合はスキップ
    if (typeof window === 'undefined') return;

    const initAd = () => {
      const { googletag } = window;
      if (!googletag) return;

      googletag.cmd.push(() => {
        // 既存のスロットがあればクリア（ページ遷移対策）
        if (rewardedSlotRef.current) {
          googletag.destroySlots([rewardedSlotRef.current]);
        }

        // 1. リワード広告スロットを定義
        const slot = googletag.defineOutOfPageSlot(
          adUnitId,
          googletag.enums.OutOfPageFormat.REWARDED
        );

        if (slot) {
          slot.addService(googletag.pubads());
          rewardedSlotRef.current = slot;

          // 2. イベントリスナーの設定
          // 報酬付与（動画視聴完了）
          googletag.pubads().addEventListener('rewardedSlotGranted', (event: any) => {
            console.log('Reward granted:', event.payload);
            window.dispatchEvent(new CustomEvent('ad-reward-granted', { detail: event.payload }));
          });

          // 広告が閉じられた
          googletag.pubads().addEventListener('rewardedSlotClosed', (event: any) => {
            if (event.slot === slot) {
              console.log('Reward ad closed');
              setIsReady(false);
              // 次のためにリフレッシュ（プリロード）
              googletag.pubads().refresh([slot]);
            }
          });

          // 広告のレンダリング完了（準備完了）
          googletag.pubads().addEventListener('slotRenderEnded', (event: any) => {
            if (event.slot === slot) {
              setIsReady(true);
            }
          });

          googletag.enableServices();
          googletag.display(slot);
        }
      });
    };

    // googletagが準備できるのを待つ
    if (window.googletag && window.googletag.apiReady) {
      initAd();
    } else {
      document.addEventListener('gpt-ready', initAd, { once: true });
    }

    return () => {
      const { googletag } = window;
      if (googletag && rewardedSlotRef.current) {
        googletag.cmd.push(() => {
          googletag.destroySlots([rewardedSlotRef.current]);
        });
      }
    };
  }, [adUnitId]);

  /**
   * 広告を表示する
   * @returns 広告が表示可能ならtrue
   */
  const showAd = useCallback(() => {
    const { googletag } = window;
    if (isReady && rewardedSlotRef.current) {
      googletag.cmd.push(() => {
        googletag.pubads().refresh([rewardedSlotRef.current]);
      });
      return true;
    }
    return false;
  }, [isReady]);

  return { isReady, showAd };
};
